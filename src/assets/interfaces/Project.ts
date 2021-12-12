import { StoryType } from "src/app/pages/board/board.component";

export interface Issue{
    id: string;
    projectname:string;
    type: StoryType;
    assignee: string;
    title: string;
    summary: string;
    status: string;
    storypoint: number;
}