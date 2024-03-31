import { axiosForumutil } from "src/util/axiosUtil";

export const getSocketResponse = async (forumId: string) => {
    try {
        const res = await axiosForumutil.get('/message/' + forumId);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}