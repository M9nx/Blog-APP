import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Props {
    status?: string;
}

export default function VerifyEmail({ status }: Props) {
    const { post, processing } = useForm();

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/email/verification-notification');
    };

    return (
        <>
            <Head title="Email Verification" />

            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Verify your email address
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another.
                        </p>
                    </div>

                    {status === 'verification-link-sent' && (
                        <div className="rounded-md bg-green-50 p-4">
                            <div className="text-sm text-green-700">
                                A new verification link has been sent to the email address you provided during registration.
                            </div>
                        </div>
                    )}

                    <form className="mt-8 space-y-6" onSubmit={submit}>
                        <div>
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={processing}
                            >
                                {processing ? 'Sending...' : 'Resend Verification Email'}
                            </Button>
                        </div>
                    </form>

                    <div className="text-center">
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="text-sm text-gray-600 hover:text-gray-900 underline"
                        >
                            Log Out
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
