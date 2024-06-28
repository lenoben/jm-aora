import { Account, Client, ID } from "react-native-appwrite";
export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.tyr.aora",
  projectId: "666eb47b00108e038d5f",
  databaseId: "666eb649003ceb304673",
  userCollectionId: "666eb688003aa93b1203",
  videoCollectionId: "666eb6b0000ac076d5d0",
  storageId: "666eb8250018888d0db1",
};
// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.projectId) // Your project ID
  .setPlatform(config.platform); // Your application ID or bundle ID.

const account = new Account(client);

export const createUser = () => {
  // Register User
  account.create(ID.unique(), "me@example.com", "password", "Jane Doe").then(
    function (response) {
      console.log(response);
    },
    function (error) {
      console.log(error);
    }
  );
};
