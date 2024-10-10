// contexts/ModalContext.js
import React, { createContext, useState, ReactNode, FC } from "react";
import { Modal } from "react-native";
import ExploreHeader3 from "./ExploreHeader3";

interface ModalContextType {
    isModalVisible: boolean;
    showModal: (content: ReactNode) => void;
    hideModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState<ReactNode>(null);

    const showModal = (content: ReactNode) => {
        setModalContent(content);
        setModalVisible(true);
    };

    const hideModal = () => {
        setModalVisible(false);
        setModalContent(null);
    };

    return (
        <ModalContext.Provider value={{ isModalVisible, showModal, hideModal }}>
            <ExploreHeader3 />
            {children}
            <Modal
                transparent={true}
                visible={isModalVisible}
                onRequestClose={hideModal}
            >
                {modalContent}
            </Modal>
        </ModalContext.Provider>
    );
};

export default ModalContext;
