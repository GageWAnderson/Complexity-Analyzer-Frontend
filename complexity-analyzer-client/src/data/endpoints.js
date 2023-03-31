const endpoints = {
    inputValidator: (uuid) => `/input_validator?uuid=${uuid}`,
    getAllUserMetadata: (uuid) => `/get_all_user_metadata?uuid=${uuid}`,
    getResultsInfo: `/get_results_info`,
    getResultGraph: `/get_result_graph`,
};

export default endpoints;