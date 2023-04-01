const endpoints = {
    inputValidator: (uuid) => `/input_validator?uuid=${uuid}`,
    getAllUserMetadata: (uuid) => `/get_all_user_metadata?uuid=${uuid}`,
    getResultsInfo: (uuid, timestamp) => `/get_results_info?uuid=${uuid}&timestamp=${timestamp}`,
    getResultGraph: (uuid, timestamp) => `/get_result_graph?uuid=${uuid}&timestamp=${timestamp}`,
};

export default endpoints;