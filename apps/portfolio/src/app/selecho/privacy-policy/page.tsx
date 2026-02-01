
export default function SelechoPrivacyPage() {
    return (
        <main className="flex-grow pt-32 pb-24 px-4 min-h-screen">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold mb-8">Selecho Privacy Policy</h1>
                <div className="prose max-w-none text-gray-400">
                    <p className="text-gray-400 mb-4"><strong>Last Updated:</strong> January 18, 2026</p>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">Purpose and Scope</h2>
                    <p className="mb-4">
                        This Privacy Policy governs the privacy principles regarding the use of the Selecho application (“Application”). By using the Application, you agree to this Policy.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">Data Collection</h2>
                    <p className="mb-4">
                        The Application does not collect any personal information (name, e-mail, location, phone number, etc.) from users. No data that could identify the user is processed.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">Data Storage</h2>
                    <p className="mb-4">
                        All data is stored solely on the user’s device. The Application does not transfer data to the cloud or to third parties. When the Application is deleted or sets are removed by the user, the related data is permanently deleted.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">Permissions</h2>
                    <p className="mb-4">
                        The Application may request the following permissions:
                    </p>
                    <ul className="list-disc pl-6 mb-6">
                        <li className="mb-2"><strong>Camera</strong> → If the user wishes to add a photo.</li>
                        <li className="mb-2"><strong>Gallery / Storage</strong> → If the user wishes to add existing images.</li>
                    </ul>
                    <p className="mb-4">
                        These permissions are used only to support the selection process.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">Third Parties</h2>
                    <p className="mb-4">
                        The Application may use Google AdMob advertising services. During ad display, Google may process device information under its own privacy policy. This data is not collected or stored by the Application. For more information, visit <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">Google Privacy Policy</a>.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">Disclaimer</h2>
                    <p className="mb-4">
                        The Application is intended solely for making selections. The developer is not responsible for the photos, content, or any sharing of such content by the user. The developer accepts no liability for hardware, software, or data losses that may occur on the user’s device.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">Legal Basis</h2>
                    <p className="mb-4">
                        The Application does not engage in any personal data processing activities under GDPR (EU) or KVKK (Turkey). Therefore, no explicit user consent is required.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">Changes</h2>
                    <p className="mb-4">
                        This Policy may be updated by the developer. The updated version becomes effective once published within the Application or through official channels.
                    </p>
                </div>
            </div>
        </main>
    )
}
