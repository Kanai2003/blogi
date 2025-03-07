CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    owner_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO users (name, username, hashed_password) VALUES
('Mr. K', 'username', '$2b$12$0MBEOuJZIPLfisy6pZOsrOjroMkfJXpv5rFGRYvKd7tBkpoIbTM3i'); -- password: password


INSERT INTO posts (title, content, owner_id) VALUES
(
    'Exploring the Depths of Modern Web Development',
    '<h1>The Evolving Landscape</h1><p>Modern web development is a constantly evolving field, with new frameworks, libraries, and tools emerging regularly. Developers must stay up-to-date with these changes to remain competitive and build high-quality web applications.</p><p>One of the key trends in modern web development is the increasing popularity of JavaScript frameworks like React, Angular, and Vue.js. These frameworks provide developers with powerful tools for building complex user interfaces and managing application state.</p><p>Another important trend is the rise of serverless computing, which allows developers to build and deploy applications without managing servers. Serverless platforms like AWS Lambda and Google Cloud Functions offer scalability and cost-effectiveness.</p><p>In addition to these trends, developers are also focusing on improving the performance and accessibility of web applications. Techniques like code splitting, lazy loading, and progressive web apps are becoming increasingly common.</p>',
    1
),
(
    'The Art of Writing Clean and Maintainable Code',
    '<h2>Why Clean Code Matters</h2><p>Writing clean and maintainable code is essential for any software project. Clean code is easier to understand, debug, and modify, which leads to increased productivity and reduced maintenance costs.</p><p>One of the key principles of clean code is to write code that is easy to read and understand. This can be achieved by using meaningful variable and function names, writing concise code, and adding comments to explain complex logic.</p><p>Another important principle is to follow established coding standards and best practices. This ensures consistency across the codebase and makes it easier for other developers to contribute to the project.</p><p>In addition to these principles, developers should also focus on writing modular and reusable code. This can be achieved by breaking down complex tasks into smaller, more manageable functions and classes.</p>',
    1
),
(
    'Understanding the Basics of Database Design',
    '<h3>Relational Databases and Beyond</h3><p>Database design is a crucial aspect of software development. A well-designed database can improve the performance, scalability, and maintainability of an application.</p><p>The most common type of database is the relational database, which stores data in tables with rows and columns. Relational databases use SQL (Structured Query Language) to query and manipulate data.</p><p>However, there are also other types of databases, such as NoSQL databases, which are designed for handling unstructured or semi-structured data. NoSQL databases are often used for applications that require high scalability and flexibility.</p><p>When designing a database, it is important to consider the data requirements of the application, the relationships between different data entities, and the performance requirements.</p>',
    1
),
(
    'The Importance of Testing in Software Development',
    '<h4>Ensuring Quality and Reliability</h4><p>Testing is an essential part of the software development process. It helps to ensure that the software meets the requirements and functions correctly.</p><p>There are different types of testing, such as unit testing, integration testing, and end-to-end testing. Unit testing focuses on testing individual components of the software, while integration testing and end-to-end testing focus on testing the interactions between different components and the overall system.</p><p>Automated testing is becoming increasingly common in software development. It allows developers to run tests automatically and quickly, which helps to identify and fix bugs early in the development process.</p><p>In addition to automated testing, manual testing is also important. It involves testing the software from a user perspective to identify usability issues and other problems.</p>',
    1
),
(
    'Building Scalable and Resilient Web Applications',
    '<h5>Architecting for the Future</h5><p>Scalability and resilience are crucial aspects of modern web applications. Scalable applications can handle increasing traffic and data, while resilient applications can recover from failures and continue to function.</p><p>One of the key techniques for building scalable applications is to use a distributed architecture. This involves breaking down the application into smaller, independent services that can be deployed and scaled independently.</p><p>Another important technique is to use caching and load balancing. Caching stores frequently accessed data in memory, which reduces the load on the database. Load balancing distributes traffic across multiple servers, which improves performance and availability.</p><p>In addition to these techniques, developers should also focus on monitoring and logging. This helps to identify performance bottlenecks and other issues.</p>',
    1
),
(
    'The Future of Artificial Intelligence and Machine Learning',
    '<p>Artificial intelligence (AI) and machine learning (ML) are rapidly evolving fields with the potential to transform many industries. From self-driving cars to personalized medicine, AI and ML are already making a significant impact on our lives.</p><p>One of the key trends in AI and ML is the increasing use of deep learning, which is a type of machine learning that uses neural networks with multiple layers. Deep learning has achieved state-of-the-art results in many areas, such as image recognition, natural language processing, and speech recognition.</p><p>Another important trend is the rise of explainable AI, which focuses on making AI models more transparent and understandable. This is important for building trust in AI systems and ensuring that they are used ethically.</p><p>In addition to these trends, researchers are also exploring new areas of AI, such as reinforcement learning and generative AI.</p>',
    1
),
(
    'The Benefits of Using Cloud Computing for Your Business',
    '<p>Cloud computing has become an increasingly popular choice for businesses of all sizes. Cloud platforms like AWS, Azure, and Google Cloud offer a wide range of services, including computing, storage, networking, and databases.</p><p>One of the key benefits of cloud computing is scalability. Cloud resources can be scaled up or down as needed, which allows businesses to handle fluctuating demand. Cloud computing also offers cost-effectiveness, as businesses only pay for the resources they use.</p><p>Another important benefit is flexibility. Cloud platforms offer a wide range of services that can be used to build and deploy applications. This allows businesses to choose the services that best meet their needs.</p><p>In addition to these benefits, cloud computing also offers improved security and reliability.</p>',
    1
),
(
    'The Importance of Cybersecurity in the Digital Age',
    '<h4>Cybersecurity is becoming increasingly important in the digital age. With the increasing reliance on technology, businesses and individuals are more vulnerable to cyberattacks.</h4><p>Cyberattacks can have a significant impact, including financial losses, data breaches, and reputational damage. It is important to take steps to protect against cyberattacks, such as using strong passwords, keeping software up-to-date, and being aware of phishing scams.</p><p>Businesses should also implement cybersecurity policies and procedures, such as firewalls, intrusion detection systems, and data encryption.</p><p>In addition to these measures, it is also important to educate employees about cybersecurity best practices.</p>',
    1
),
(
    'The Future of Work and the Rise of Remote Collaboration',
    '<h5>The future of work is changing rapidly. Remote collaboration is becoming increasingly common, driven by advances in technology and changing employee expectations.</h5><p>Social media has become an integral part of modern society. It has transformed the way we communicate, share information, and connect with others.</p><p>Remote collaboration offers many benefits, such as increased flexibility, improved work-life balance, and reduced commuting time. However, it also presents challenges, such as communication difficulties and social isolation.</p><p>To be successful in a remote work environment, it is important to have strong communication skills, be organized and disciplined, and use the right tools and technologies.</p><p>Businesses should also provide employees with the support and resources they need to work remotely effectively.</p>',
    1
),
(
    'The Impact of Social Media on Society',
    '<p>Social media has become an integral part of modern society. It has transformed the way we communicate, share information, and connect with others.</p><p>Social media offers many benefits, such as staying connected with friends and family, accessing information and news, and promoting businesses and causes. However, it also presents challenges, such as cyberbullying, misinformation, and privacy concerns.</p><p>It is important to use social media responsibly and be aware of its potential impact. Social media companies should also take steps to address the challenges and promote responsible use.</p>',
    1
),
(
    'The Benefits of Learning a New Language',
    '<h1>Learning a new language can be a rewarding and enriching experience. It can open up new opportunities for travel, communication, and cultural understanding.</h1><p>Learning a new language can also improve cognitive skills, such as memory, problem-solving, and multitasking. It can also boost confidence and self-esteem.</p><p>There are many different ways to learn a new language, such as taking classes, using language learning apps, and immersing yourself in the language.</p><p>The key to success is to be patient, persistent, and have fun.</p>',
    1
),
(
    'The Impact of Social Media on Society',
    '<h5>Architecting for the Future</h5><h3>Social media has become an integral part of modern society. It has transformed the way we communicate, share information, and connect with others.</h3><p>Social media offers many benefits, such as staying connected with friends and family, accessing information and news, and promoting businesses and causes. However, it also presents challenges, such as cyberbullying, misinformation, and privacy concerns.</p><p>It is important to use social media responsibly and be aware of its potential impact. Social media companies should also take steps to address the challenges and promote responsible use.</p>',
    1
),
(
    'The Benefits of Learning a New Language',
    '<h1>Learning a new language can be a rewarding and enriching experience. It can open up new opportunities for travel, communication, and cultural understanding.</h1><p>Learning a new language can also improve cognitive skills, such as memory, problem-solving, and multitasking. It can also boost confidence and self-esteem.</p><p>There are many different ways to learn a new language, such as taking classes, using language learning apps, and immersing yourself in the language.</p><p>The key to success is to be patient, persistent, and have fun.</p>',
    1
);