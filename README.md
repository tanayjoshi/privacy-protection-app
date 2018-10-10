App Safety Recommendation System Based On Context And Criticality

How to run: Install dependencies (npm install) and then run the react-native app (npm start).

Abstract
Mobile applications installed on smartphones can prove to be a gateway for malicious app developers to steal important user data without the user even knowing about it. One of the ways to fix this problem is by making the permissions model used by the operating system more intuitive so that the user can understand what permissions are required by an app, and can take an informed decision about whether to grant those permissions or not. In this regard, we create a new full-stack software system, which stores permission information about apps in its database. We design a new ranking algorithm based on these permissions, and then implement it in the system. This system shows a final ‘safety’ score for apps. We also make sure that the design of the system is user-friendly, as this plays an important role.

General Approach -

Information Gathering: This section focusses on the creation of our database based on which we will be showing relevant safety information. We need to have access to the permission lists of as many as apps as possible. This information is not readily available to us. So, we obtain this by web crawling through various different pages (such as best-selling, top-rated, etc.) of the Play Store using the Python programming language. We even automate various crawling techniques so that we need minimal physical supervision. Once we have an app database, we proceed to sanitize it (this includes checking for unicode-UTF8 conversions, general formatting, etc.), and finally, we have our permission list of apps, which is divided into sub-permissions as well.

Ranking Criteria/Algorithm: We begin working on the data we have gathered so far. We call this section App ranker, where we score individual permissions of an app, based on its priority, importance, reach of the resource, also taking into account the various sub-permissions that an app may have. This includes both context-based rankings of the permissions, as well as finer-ranking based on the criticality of the permission. By context-based rankings, we mean that an app is ranked according to its expected permissions required by an average app in that genre. This is the most important step in that this results in another one-to-one corresponding database, which shows whether an app’s permission list is justified based on its usability and various other factors discussed earlier.

Implementation: We implement a new full-stack software system to run on mobiles, using React-Native. This would result in an application where the user would have the option to search for a particular app or view the safety information of the currently installed apps. Previously mentioned database information would be stored in MongoDB and the back-end interface would be formed using NodeJS/Express.

Check out photos for detailed views.
