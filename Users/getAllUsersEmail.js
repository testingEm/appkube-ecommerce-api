const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider();

module.exports.getAllUsersEmail = async (event) => {
  try {
    const params = {
      UserPoolId: 'us-east-1_WixNIljDH', // Replace with your actual User Pool ID
    };
    
    const data = await cognito.listUsers(params).promise();
    const users = data.Users.map(user => ({
      username: user.Username,
      email: user.Attributes.find(attr => attr.Name === 'email').Value
    }));
    
    return {
      statusCode: 200,
      body: JSON.stringify({ users }),
      headers: {
        'Content-Type': 'application/json'
      }
    };
  } catch (err) {
    console.error('Error: ', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
      headers: {
        'Content-Type': 'application/json'
      }
    };
  }
};
