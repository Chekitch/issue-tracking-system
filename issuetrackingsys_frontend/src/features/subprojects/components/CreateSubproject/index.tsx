import { useState } from "react";
import { useAppSelector } from "../../../../store/hooks";


interface Props{
    open:boolean;
    onClose: () => void;
    onSubprojectCreated: (id: string, projectName: string, description: string) => void;
}

const CreateSubProjectModal: React.FC<Props> = ({open, onClose, onSubprojectCreated}) => {
    const userId = useAppSelector((state) => state.auth.userId);
    const [projectName, setProjectName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleClose = () => {
        setProjectName('');
        setDescription('');
        setError('');
        onClose();
    };

    const handleSubmit = async () => {
        const trimmedName = projectName.trim();
        const trimmedDescription = description.trim();

        if(!trimmedName || !trimmedDescription){
            setError('All fields are required');
        }
        if(!userId){
            setError('User authentication required');
            return;
        }

        setLoading(true);
        setError('');
    }

    SubProjectAPI.
}