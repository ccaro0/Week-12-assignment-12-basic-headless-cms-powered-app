//import { remark } from 'remark';
//import html from 'remark-html';
//import fs from 'fs';
//import path from 'path';
//import matter from 'gray-matter';
//const postsDirectory = path.join(process.cwd(), 'posts');


import got from 'got';
//define the url for rest endpoint
const postsUrl = 'https://dev-cs-55-13-fall-2026.pantheonsite.io/wp-json/twentytwentyone-child/v1/latest-posts/1';



//function returns ids for all json objects in array
export async function getAllIds() {
  //get filepath to the json file
 
  let jsonString; //load json file contents
  try {

    //next line uses got synchronously to retrive via https the json data from wordpress site
    jsonString = await got(postsUrl);
    console.log(jsonString.body);
    
  } 
    catch(error) {
    jsonString.body = [];
    console.log(error);
  }

  //convert the string from file into json array object
  //const jsonObj = JSON.parse(jsonString);
  const jsonObj = JSON.parse(jsonString.body); 

  // use map() on array to extract just id properties into new array of obj values
  return jsonObj.map(item => {
    return {

      params: {
        id: item.ID.toString() //make sure to match the case its case sensitive

      }

    }

  });
  //above code returns an array with nested obj values
}

//function returns names and ids for all json objects in array, sorted by name property
export async function getSortedList() {
  //get filepath to json file
  //const filePath = path.join(dataDir, 'persons.json');

  //load the json file contents
  //const jsonString = fs.readFileSync(filePath, 'utf8');
  let jsonString;
  try {
    //next line uses got synchronously to retrive via https our json data from wp site
    jsonString = await got(postsUrl);
    console.log(jsonString.body);
  } catch(error) {
    jsonString.body = [];
    console.log(error);
  }
  
  //convert string from file into json array object
  //const jsonObj = JSON.parse(jsonString);
  const jsonObj = JSON.parse(jsonString.body);

  //sort the json array by name property
  jsonObj.sort(function (a, b) {
      return a.post_title.localeCompare(b.post_title);
  });

  //use map() on array to extract just id plus name properties into new array of obj values
  return jsonObj.map(item => {
    return {

      id: item.ID.toString(),
      name: item.post_title,
      date: item.post_date

    }

  });
}

export async function getData(idRequested) {
  //get the filepath to the json file
  //const filePath = path.join(dataDir, 'persons.json');

  //load the json file contents
  //const jsonString = fs.readFileSync(filePath, 'utf8');
  let jsonString;
  try {

    jsonString = await got(postsUrl);

    console.log(jsonString.body);

  } catch(error) {

    jsonString.body = [];
    console.log(error);

  }

  //convert string from file into json array object
  //const jsonObj = JSON.parse(jsonString);
  const jsonObj = JSON.parse(jsonString.body);

  //find object value in array that has the matching id
  const objMatch = jsonObj.filter(obj => {

    return obj.ID.toString() === idRequested;

  });

  //extract object value in filtered array if any
  let objReturned;

  if (objMatch.length > 0) {
    objReturned = objMatch[0];

  } else {

    objReturned = {};

  }
  //console.log(objReturned);
  //return the object value found
  return objReturned;
}