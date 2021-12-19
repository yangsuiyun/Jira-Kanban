import { StoryStatus } from "../enums/StoryStatus";
import { StoryType } from "../enums/StoryType";

export interface Issue{
    id: string;
    projectname:string;
    status: StoryStatus;
    assignee: string;
    title: string;
    summary: string;
    type: StoryType;
    storypoint: number;
    priority: string;
}