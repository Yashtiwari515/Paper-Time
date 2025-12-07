import React from 'react';
import Hero from './Hero';
import PaperSelector from './PaperSelector';
import ChatbotWidget from './ChatBot';
import "./style.css";

function MainPage() {
    return (
        <>
            <div className="main-flex">
                <div className="left-section">
                    <Hero />
                </div>

                <div className="right-section">
                    <PaperSelector />
                </div>
            </div>

            <ChatbotWidget />
        </>
    );
}

export default MainPage;
