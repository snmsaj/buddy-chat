import React, { useCallback, useEffect, useState, Fragment } from "react";
import firebase from '../../../firebase';
import { connect } from 'react-redux';
import { setCurrentGroup } from '../../../actions/actionCreators';
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";


const Groups = (props) => {
    const [groups, setGroups] = useState([])
    const [groupName, setGroupName] = useState('')
    const [modal, setModal] = useState(false)
    // const [firstLoad, setFirstLoad] = useState(true)
    const [activeGroup, setActiveGroup] = useState('')
    const [user] = useState(props.currentUser)
    const [groupsRef] = useState(firebase.database().ref('groups'))
    // const groupsRef = firebase.database().ref('groups')
    
    // const setFirstGroup = useCallback(() => {
    //     const firstGroup = groups[0]

    //     if (firstLoad && groups.length > 0) {
    //         props.setCurrentGroup(firstGroup);
    //         // setActiveGroup(firstGroup.id);
    //     }

    //     setFirstLoad(false)
    // }, [firstLoad, groups, props])

    const addListeners = useCallback(() => {
        let loadedGroups = []
        groupsRef.on('child_added', snap => {
            loadedGroups.push(snap.val())
            console.log(loadedGroups)
            setGroups(loadedGroups)
        })
    }, [groupsRef])

    const removeListeners = useCallback(() => {
        groupsRef.off()
    }, [groupsRef])


    useEffect(() => {
        addListeners();
        
        return () => removeListeners()
    }, [addListeners, removeListeners])


    
    const closeModal = () => setModal(false)
    const openModal = () => setModal(true)

    const addGroup = () => {
        const key = groupsRef.push().key;
        const newGroup = {
            id: key,
            name: groupName,
            createdBy: {
                name: user.displayName,
                avatar: user.photoURL
            }
        }

        groupsRef
            .child(key)
            .update(newGroup)
            .then(() => {
                setGroupName('')
                console.log('channel added')
            })
            .catch(err => {
                console.error(err)
            })
    }

    const handleChange = (e) => {
        setGroupName(e.target.value)
    }


    const changeGroup = (group) => {
        setActiveGroup(group.id)
        props.setCurrentGroup(group);
    }


    const displayGroups = (groups) =>
    groups.length > 0 &&
    groups.map(group => (
      <Menu.Item
        key={group.id}
        onClick={() => changeGroup(group)}
        name={group.name}
        style={{ opacity: 0.7 }}
        active={group.id === activeGroup}
      >
        # {group.name}
      </Menu.Item>
    ));


    const handleSubmit = (e) => {
        e.preventDefault();

        if (isFormValid(groupName)) {
            addGroup();
        }
    }

    const isFormValid = (groupName) => groupName;


    return (
        <Fragment>
            <Menu.Menu style={{ paddingBottom: '2em' }}>
                <Menu.Item>
                    <span>Groups</span>
                    <Icon name="add" onClick={openModal} />
                </Menu.Item>
                {/* {groups.map((group) => (

                    <Menu.Item key={group.id} name={groupName} >
                        # {group.name}
                    </Menu.Item>
                ))
                } */}
                {displayGroups(groups)}
            </Menu.Menu>

            <Modal basic open={modal} onClose={closeModal}>
                <Modal.Header>Add a Group</Modal.Header>
                <Modal.Content>
                    <Form onSubmit={handleSubmit} >
                        <Form.Field>
                            <Input fluid label="Name of Group" name="groupName" onChange={handleChange} />
                        </Form.Field>
                    </Form>
                </Modal.Content>

                <Modal.Actions>
                    <Button color='teal' inverted onClick={handleSubmit}>
                        <Icon name="checkmark" /> Add
                    </Button>

                    <Button color='red' inverted onClick={closeModal}>
                        <Icon name="remove" /> Cancel
                    </Button>
                </Modal.Actions>
            </Modal>
        </Fragment>
    );
}

export default connect(null, {setCurrentGroup})(Groups);