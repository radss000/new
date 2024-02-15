import React, { useState } from 'react';
import { Button } from 'antd';
import Image from "next/image";

const SocialLogins = ({ onSubmit }) => {
    const providers = ['apple', 'google'];
    const [isRedirecting, setIsRedirecting] = useState(false);

    return (
        <div className="w-full flex flex-col h-full gap-6 items-center justify-center">
            <div className="or-login-with text-base">Or login with</div>
            {providers.map((provider) => (

                    <Button
                        key={provider}

                        className="h-fit hover:border-textOrange gradientedBackground hover:gradientedBackground text-white rounded-xl text-sm  flex flex-row items-center justify-center gap-1 hover:scale-105 w-full"
                        onClick={() => {
                            setIsRedirecting(true);
                            onSubmit(provider);
                        }}
                        icon={<Image width={100} height={100} src={`/Images/${provider}.png`} alt={provider} className="w-7 h-7" />}
                    >
                        {provider.replace(/^\w/, (c) => c.toUpperCase())}
                    </Button>

            ))}
            {isRedirecting && <div className="redirecting mt-4">Redirecting...</div>}
        </div>
    );
};

export default SocialLogins;
