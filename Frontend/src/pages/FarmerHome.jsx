import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import FarmerNav from '../components/farmer/FarmerNavbar';

const FarmerHome = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/signin', { replace: true });
        } else if (user.role !== 'farmer') {
            if (user.role === 'buyer') navigate('/dashboard/buyer', { replace: true });
            else navigate('/', { replace: true });
        }
    }, [user, navigate]);

    return (
        <div className="p-4 max-w-5xl mx-auto ">
            <div className="w-full max-w-4xl px-4 mx-auto flex items-center justify-between">
                <FarmerNav />
            </div>

            <div className="p-4 md:p-8 bg-gray-50 min-h-fit rounded-xl shadow mt-6">
                <h1 className="text-3xl font-bold text-green-800 mb-4 text-center">Empowering India, One Harvest at a Time</h1>

                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    As a farmer, you are the backbone of India's economy. Agriculture contributes approximately 18% to India's GDP and employs over 44% of the workforce, making it a vital sector for national growth and stability.<grok:render card_id="5b7acc" card_type="citation_card" type="render_inline_citation">
                        <argument name="citation_id">1</argument>
                    </grok:render><grok:render card_id="0a811f" card_type="citation_card" type="render_inline_citation">
                        <argument name="citation_id">6</argument>
                    </grok:render> By participating in CropConnect, you're not just selling your produce—you're directly contributing to reducing the influence of middlemen, ensuring fair prices, and boosting your income.
                </p>

                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    Your hard work in the fields supports food security for over a billion people, promotes sustainable farming practices, and drives rural development. India, as the second-largest producer of agricultural products globally with an output of $567 billion, relies on farmers like you to maintain its position and foster innovation in agriculture.<grok:render card_id="442465" card_type="citation_card" type="render_inline_citation">
                        <argument name="citation_id">0</argument>
                    </grok:render>
                </p>

                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    Every crop you harvest strengthens local economies, creates employment opportunities, and helps build a self-reliant India. Platforms like CropConnect empower you to connect directly with buyers, maximizing your profits and enabling investments in better technology and practices for future generations.
                </p>

                <p className="text-green-700 font-semibold text-lg mt-6 text-center">
                    Thank you for your dedication and hard work. Together, we are cultivating a prosperous and sustainable future for Indian agriculture.
                </p>
            </div>
        </div>
    );
};

export default FarmerHome;