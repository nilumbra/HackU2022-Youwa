import axios from 'axios';
export default {
  // For test purposes...
  async getQuery(word) {
    const response = await axios.get(`https://www.youdao.com/result?word=${word}&lang=en`);
    return response.data;
  },

  // Post raw contract text for processing...
  async postContractForm(formdata) {
    const response = await axios.post('/post', 
                                            formdata,
                                            { headers: { 'Content-Type': 'application/json' } });
    return response.data;
  }
}