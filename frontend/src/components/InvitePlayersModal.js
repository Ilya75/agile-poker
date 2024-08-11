import { useContext, useState } from "react";
import Button from "./Button";
import Modal from './Modal';
import Input from './FormElements/Input';

const InvitePlayersModal = ({gameUrl, showModal, closeDialogHandler}) => {
    const [showDialog, setShowDialog] = useState(showModal);


     const inputHandler = () => {

     }

    return (
        <Modal show={showModal} onCancel={closeDialogHandler} 
            header="Invite players" contentClass="results__modal-content" footerClass="results__modal-actions" 
            footer={<Button onClick={closeDialogHandler}>Close</Button>}>
            <div className='results-container'>
                <form>
                    <p><strong>Use url below for players to join the game</strong></p>
                    <label htmlFor="gameUrl">Game Url</label>
                    <input id="gameUrl" type="text"  value={gameUrl} readOnly />
                </form>
            </div>
        </Modal>
      );
}

export default InvitePlayersModal;