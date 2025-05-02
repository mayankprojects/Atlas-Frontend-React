import axios from 'axios';

const ATLAS_API_BASE_URL = "http://localhost:9090/classes";  // Adjusted port if needed

class AtlasService {
    saveAtlas(atlas) {
        return axios.post(ATLAS_API_BASE_URL, atlas);
    }

    getAtlasList() {
        return axios.get(ATLAS_API_BASE_URL);
    }

    getAtlasById(id) {
        return axios.get(ATLAS_API_BASE_URL + "/" + id);
    }
    
    deleteAtlas(id) {
        return axios.delete(ATLAS_API_BASE_URL + "/" + id);
    }

    updateAtlas(atlas, id) {
        return axios.put(ATLAS_API_BASE_URL + "/" + id, atlas);
    }
}

export default new AtlasService();