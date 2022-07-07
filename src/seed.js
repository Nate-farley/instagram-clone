/* eslint-disable no-plusplus */
// NOTE: replace 'NvPY9M9MzFTARQ6M816YAzDJxZ72' with your Firebase auth user id (can be taken from Firebase)


import { collection, addDoc } from "firebase/firestore";

export function seedDatabase(FieldValue) {
  const users = [
    {
      userId: 'UpCJXfVoI0Vefmtn1KE7147XBBt1',
      username: 'karl',
      fullName: 'Karl Hadwen',
      emailAddress: 'karlhadwen@gmail.com',
      following: ['2'],
      followers: ['2', '3', '4'],
      dateCreated: Date.now()
    },
    {
      userId: '2',
      username: 'raphael',
      fullName: 'Raffaello Sanzio da Urbino',
      emailAddress: 'raphael@sanzio.com',
      following: [],
      followers: ['UpCJXfVoI0Vefmtn1KE7147XBBt1'],
      dateCreated: Date.now()
    },
    {
      userId: '3',
      username: 'dali',
      fullName: 'Salvador Dalí',
      emailAddress: 'salvador@dali.com',
      following: [],
      followers: ['UpCJXfVoI0Vefmtn1KE7147XBBt1'],
      dateCreated: Date.now()
    },
    {
      userId: '4',
      username: 'orwell',
      fullName: 'George Orwell',
      emailAddress: 'george@orwell.com',
      following: [],
      followers: ['UpCJXfVoI0Vefmtn1KE7147XBBt1'],
      dateCreated: Date.now()
    }
  ];

  // eslint-disable-next-line prefer-const
  
  for (let k = 0; k < users.length; k++) {
    
    const dataUserRef = collection(FieldValue, "users");

   addDoc(dataUserRef, users[k])

   console.log('user' + [k] + 'has been added' );
 
  };

  // eslint-disable-next-line prefer-const
  for (let i = 1; i <= 5; ++i) {

    const dataPhotoRef = addDoc(collection(FieldValue, "photos"), {
        
        photoId: i,
        userId: '2',
        imageSrc: `/images/users/raphael/${i}.jpg`,
        caption: 'Saint George and the Dragon',
        likes: [],
        comments: [
          {
            displayName: 'dali',
            comment: 'Love this place, looks like my animal farm!'
          },
          {
            displayName: 'orwell',
            comment: 'Would you mind if I used this picture?'
          }
        ],
        userLatitude: '40.7128°',
        userLongitude: '74.0060°',
        dateCreated: Date.now()
    });
    console.log("Added phtot data" + [i]);
  }
}