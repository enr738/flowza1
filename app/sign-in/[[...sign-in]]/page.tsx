import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
    return (
        <div className="min-h-screen bg-[#1A1628] flex items-center justify-center">
            <SignIn
                appearance={{
                    variables: {
                        colorPrimary: '#7C3AED',
                        colorBackground: '#231D35',
                        colorText: '#FFFFFF',
                        colorTextSecondary: '#9E97B8',
                        colorInputBackground: '#2E2845',
                        colorInputText: '#FFFFFF',
                        borderRadius: '12px',
                    },
                    elements: {
                        card: 'shadow-2xl border border-white/10',
                        headerTitle: 'text-white font-bold',
                        socialButtonsBlockButton: 'border border-white/20 text-white',
                    },
                }}
            />
        </div>
    );
}
