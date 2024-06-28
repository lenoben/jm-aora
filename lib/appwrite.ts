import SignIn from "@/app/(auth)/signin";
import { Account, Avatars, Client, Databases, ID } from "react-native-appwrite";
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
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (
  email: string,
  password: string,
  username: string
) => {
  // Register User
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);
    await sign_in(email, password);
    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );
    return newUser;
  } catch (err: any) {
    console.log(err);
    throw new Error(err);
  }
};

export async function sign_in(email: string, password: string) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (err: any) {
    throw new Error(err);
  }
}
