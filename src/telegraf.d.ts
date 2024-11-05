import { Context, Scenes } from "telegraf";

interface SessionData extends Scenes.WizardSession {
	stickerCount: number;
	// ... more session data go here
}

interface MyContext extends Context {
	// declare session type
	session?: SessionData;
	// declare scene type
	scene: Scenes.SceneContextScene<MyContext, Scenes.WizardSessionData>;
	// declare wizard type
	wizard: Scenes.WizardContextWizard<MyContext>;
}

