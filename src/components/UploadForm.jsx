import React, { useState } from 'react';
import { Modal, Button, FileInput, Group } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { uploadPhoto } from '../lib/api';

export default function UploadForm({ isOpen, onClose, handlePictureUploaded }) {
    const [file, setFile] = useState(null);

    const handleFileChange = (newFile) => {
        setFile(newFile);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        try {
            await uploadPhoto(formData);
            notifications.show({
                message: 'Nuotrauka įkelta sėkmingai',
                color: 'green',
                position: 'bottom-right',
            });
            handlePictureUploaded();
            onClose();
        } catch (error) {
            notifications.show({
                title: 'Klaida!',
                message: 'Nepavyko įkelti nuotraukos.',
                color: 'red',
                position: 'bottom-right',
            });
        }
    };

    return (
        <Modal opened={isOpen} onClose={onClose} title="Įkelti nuotrauką" centered>
            <form onSubmit={handleSubmit}>
                <Group direction="column" grow>
                    <FileInput
                        value={file}
                        onChange={handleFileChange}
                        placeholder="Pasirinkite nuotrauką"
                        accept="image/*"
                        required
                    />
                    <Button type="submit" fullWidth color='#62da97'>
                        Patvirtinti
                    </Button>
                </Group>
            </form>
        </Modal>
    );
};