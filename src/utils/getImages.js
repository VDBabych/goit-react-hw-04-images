import axios from "axios";

export const getImages= async({page, query})=> {
    const response = await axios.get("https://pixabay.com/api/", {
        params: {
            key: "31574870-ec3306c679007fa4646c6ce9c",
            page,
            q: query,
            per_page: 12,
            image_type: "photo",
            orientation: "horizontal",
        }
    })
    return response.data
}