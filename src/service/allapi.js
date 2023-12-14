import { commonRequest } from "./CommonRequest";
import { BASE_URL } from "./baseUrl";



// ADD video

// define function for addvideo



export const addVideo = async (body) => {
   return await commonRequest("POST", `${BASE_URL}/videos`, body)


}


// get or view video from back end

// define a function for getvideo

export const getVideo = async () => {
   return await commonRequest("GET", `${BASE_URL}/videos`, "")
}


// delete the video

// define  a function for delete video

export const deleteVideo = async (id) => {
   return await commonRequest("DELETE", `${BASE_URL}/videos/${id}`, {})
}


// define a function for add category

export const addCategory = async (body) => {
   return await commonRequest("POST", `${BASE_URL}/categories`, body)
}


// to get category
export const getAllCategory = async () => {
   return await commonRequest("GET", `${BASE_URL}/categories`, "")
}


// to delete category
export const deleteCategory = async (id) => {
   return await commonRequest("DELETE", `${BASE_URL}/categories/${id}`, {})
}


// get history

export const getHistory = async()=>{
 return await commonRequest("GET",`${BASE_URL}/watchHistory`,"")
}


// add history

export const addHistory = async(body)=>{
   return await commonRequest("POST",`${BASE_URL}/watchHistory`,body)
  }


// get single video details  
  
export const getVideos = async (id) => {
   return await commonRequest("GET", `${BASE_URL}/videos/${id}`, "")
}



// update the videos to categories when dragged

// to upppdate dragged details in category allvideos[]


export const updateCategory = async (id,body) => {
   return await commonRequest("PUT", `${BASE_URL}/categories/${id}`, body)
}