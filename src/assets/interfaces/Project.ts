import { StoryStatus as StoryStatus, StoryType } from "src/app/pages/board/board.component";

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