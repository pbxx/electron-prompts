import PromptManager from "./prompts.js"

const prompts = new PromptManager({
    devMode: true,
})

const result = await prompts.spawn({
    windowTitle: "Fortnite Auto Tracker",
    cancelButton: {
        classes: ["btn", "btn-secondary"],
        // value: "Lets slow'r down there partner..."
    },
    elements: [
        {
            type: "header",
            value: "Change display name",
        },
        {
            type: "paragraph",
            value: "Enter a new display name below:",
        },
        {
            name: "displayName",
            type: "input",
            placeholder: strings.namePrompt.placeholder,
            classes: ["form-control"],
            value: "Pellux_",
        },
    ],
    buttons: [
        {
            name: "submit",
            classes: ["btn", "btn-primary"],
            value: "Save Changes",
        },
    ],
})
logs.log("prompt completed", result)