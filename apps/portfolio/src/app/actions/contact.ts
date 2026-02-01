"use server";

/* filepath: apps/portfolio/src/app/actions/contact.ts */

export async function submitContactForm(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    console.log("Contact form submission received:", { name, email, message });

    // Mocking a successful response for now to unblock build
    // In a real scenario, you'd use 'resend' or a similar service to send an email.

    try {
        // Validation logic could go here
        if (!name || !email || !message) {
            return {
                success: false,
                message: "Missing required fields.",
                errors: {
                    name: !name ? ["Name is required"] : [],
                    email: !email ? ["Email is required"] : [],
                    message: !message ? ["Message is required"] : [],
                }
            };
        }

        return {
            success: true,
            message: "Success! I will get back to you soon."
        };
    } catch (e) {
        return {
            success: false,
            message: "Failed to send message. Please try again later."
        };
    }
}
