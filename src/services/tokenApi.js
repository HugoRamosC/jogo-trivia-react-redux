async function triviaTokenApi() {
  try {
    const request = await fetch('https://opentdb.com/api_token.php?command=request');
    const response = await request.json();
    return response.token;
  } catch (error) {
    console.log(error);
    return error.message;
  }
}

export default triviaTokenApi;

// {
//   "response_code":0,
//   "response_message":"Token Generated Successfully!",
//   "token":"f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
// }
