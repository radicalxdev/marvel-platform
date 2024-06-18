import { Grid, Typography } from '@mui/material';

import HistoryCard from '@/components/HistoryCard';

import BookImage from '../../assets/images/BookImage.png';

import styles from './styles';

const questionDetails = [
  {
    question: 'What is the main focus of UX design?',
    possibleAnswers: [
      'Designing what the users experience should be',
      'Making the users experience better',
      'Redesigning products completely',
      'Ignoring user feedback',
    ],
  },
  {
    question: 'What are the three most important factors in UX design?',
    possibleAnswers: [
      'Useful, usable, desirable',
      'Cheap, fast, colorful',
      'Complex, slow, boring',
      'Unattractive, difficult, slow',
    ],
  },
  {
    question: 'What is an example of something a UX designer might do?',
    possibleAnswers: [
      'Creating wireframes',
      'Making coffee cups',
      'Building cars',
      'Performing surgery',
    ],
  },
];

const answerKeyDetails = [
  {
    question: 'What is the main focus of UX design?',
    answer: 'Designing what the users experience should be',
  },
  {
    question: 'What are the three most important factors in UX design?',
    answer: 'Useful, usable, desirable',
  },
  {
    question: 'What is an example of something a UX designer might do?',
    answer: 'Creating wireframes',
  },
];
const HistoryInterface = () => {
  const renderTitle = () => {
    return (
      <Grid {...styles.titleGridProps}>
        <Typography {...styles.titleProps}>Output History</Typography>
      </Grid>
    );
  };
  return (
    <Grid {...styles.mainGridProps}>
      {renderTitle()}
      {/* Remove this below when making the list of history cards */}
      <HistoryCard
        backgroundImgURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAKgAswMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAACBAABAwUGB//EADoQAAICAQIDBAgEBQMFAAAAAAABAgMRBBMSITEFQVFxFCIyUmGBkaEjQsHRBjNisfCCkuEVQ1Nyov/EABsBAAIDAQEBAAAAAAAAAAAAAAIDAQQFAAcG/8QAJhEAAwABAwQDAQADAQAAAAAAAAECAwQRExIhMUEFFFFhMnGRFf/aAAwDAQACEQMRAD8A+f7ZFWNKsvbPvOc0PqCqrL2xlVl7ZPOd9UVVZarGdsLbJ5jvrCyrJtjO2Ftkc5P1hTbLVY06yKsJZiHphXbLVQzthKslZRb04rtBKoZ2w41hrIVcuHYXVIWyMqs0VZLyGbkx7Csag1UMqsNVi3kK1IXjUGqhlVhKsTWQU0LbRe0N7ZFWA7FMU2iDm2QHrAOVtk2htVhKsxVqz1V4UKbRTqHtom0EtWQ8Iiqi1WP7RNkYtWhbwiO2FtDqqC2cnLVHPEhBVEdQ/sl7AxakU4Ocqw1WPOgioGLUC6lCaqNFUNxpNFSNnUFHNAnGo0VI4qTRUjHnMrLjEVSEqh5UhKkB5ilcCSqDVQ4qi9oW8ohwKKovaHFUXt4A5RVQJbRB3bIdyieg5CrCVYwqw1WfIfYPXGhZVh7QyqwtslagBim0FtDO2EqwvsgbCu0WqhzbLVYU6kBoU2iKob2wlUPnUCaQmqi9kdVQSqHzqCtYkqg1UOKoLbHLUFa1uKxqDVYwqzRVjFnKWWNxbbLVY0qy9sbzbmbkgW2y1WNKsLbO5CrS2E1WWqxvbC2wesW12E9sg5tEI6xWxxFWEqxpVhKs+HWY9RdC6rCVYwqw1WFzC3QrtlqsbVZe0Gsu4DsVVYW2MqsJVhq+4t2KqsNVjO2TbHTkYur3MOAtVjCrCUCxGQr0xfbJtjXAWqyzNle2LqsLgGOAtVjlZVsXUA1A3UAuAbNlLIhfgCVZuoBqA5UUciF1WXtjKgXtk7lShXgIObRR24vc4igEqzZQNFWeeqz0p2YcASgMKsJVjJoU8guqw1WMqsJVj5oVVi22TbGtsLaHJi+sVVYSqyMxqD2x8sB2KbRaqwNqsvbHSwHQoqy1WNbZNssxQmmLbZfAMKsvgLMsr2zDgLUBhQCVY1MqWxdQCVY1Gp9yLkqqVxWzwvBc8+Q2W/CKOa4lb0zGFLk+SyXLbq5Sw5e6jG7Vuaar9SHh3sWdmEW4wv2YWo+QXdYxp6mS6RikQQdpB/DJn/ayfrKjA0jA0jA0jA8shnr9WZxgaKBpGBqoFuEIqzBQCVZuqzSNZYmRTsXVYaqGVWEqx0yLdiyqCVQ2qwlWPSA6xTbwTbHNom0GiHQntlOsddeO/HxMpOCeIpzfwH45b8AVaQuqy3Wo9Wl8WDfquDPFKMWvyw5yEbNVOWXGCiu+U3k0MOmuvJn6jVqEPcVa9lOcv6eQM9S49ZKL8F6zORbroL2rnP4Q/wAwKz103lVYh8e80sejMDVfJW+yO1ZrYwxxxlKXg5c/+BG3Uucm5z5+6uiOY7W3lvLJuZLc4FBjZtReTyOSv91GMrW+pg5ZJ1G9KRX2NNwgHCQ7dHbHfijWESRibwieR4+569VAqBooGkYGqgXsaK9WZKBooGqgaxrLcoS7MYwDVZvGsPhS64HJAOzCNYarNHKEOrx5vBlLUww0nny/cYiN2y5RivafkZyk8PhSWO9i1/aNVXhxeGcs5Or7TtsWOJRi/HD+3QsYsbphdFHQ1eojCOeJSx+ebxFHI1PaMHlOdk//AF9VP/PIRvuc5Nyk5PxbyxOyw2MGCUJy42NWdoTxiuEI/Hq/8+QlbqJ2P8Sbk/izKc8mcnk1MalGXnw7mjsA48gpZNq68ljqRj5tPsCm30N4Rb6hwqGFCFcHZbKMK4+1KTwl5sF2vRnXj79jKNeTRqNUHZZOMILrKTwjlav+ItPSnHRQ3p+/PlD6cmzi6jW36qzc1F0rH3Loo+SDnFd/6JnS2eil2tpIyajC2SX5uFLJDzW+UN4EM+qz64nFflX0CUo+CXkIq4itPDsSpez0zjOgpxQS1CXRJ+bwc/cJuGhjukLeJHSWqx3JE9Na6Jv6I5u4C7C1ORkcKOjLWyf5Y/PmZy1k2uU2vLkc+VuO/BnK745LENsNYV+DktQ10a+byLXXuSw5trwFZ3i1lxbxruMnEa23d2EkhOyzIMrcmbWTSxUHUJICcsmMuYzwZJs5NHHexTyoV4cmkaxjajCLlOUYxXWUnhLzbEb+3ezdOmoTnqZL8tK5f7ny+mS3FVXZIo1iq/CG4Utvksmmonp9DUrNZdXRF9HOXN+S6v5JnmtX/EOvvfDpYV6WPc4+tL/c+X0RyHXO22Vls5Tsl7U5ybb+bLmPBT/yEv42q70ei1v8VVxzX2dpnN/+W5YXyj1fzx5HC1er1Ots3NXdOyS9lN8o+S6IGNJtGkvY8cY/By+Jn0jCKfcHh94zCjPdn4DENDnnZJQivHr9BjtIdHxG/o52CHXVOiXLhm/jnBAeVDv/ABq/D2m9Hxz5E3l3JvzZyPTal0zJ+C5BemyfspL55PEpxUbrxHXV77or5sF6hrriJyt+Uvamwt74pj4xv2LeNHReob6SYLub6vIhulO4tRJPQOu0ylcKu3PL7GVuorrX4lsK/DiaRbxy/SCnHv4Q1O3Jn1OdZ2vpIf8AcnY/CEH+uEYS7dfSjTLPv2Sz9l+5ex4cj9DVgt+jsqOS5uqmPFdbXXHxnJLP1POW9qay5YlqHBe7UuH/AJFG8ybby31b6vzL2LTvfuyHpW/LPRXdt6GjlVG3USXuR4Y/WX6I52o7e1ln8iFen8GlxS+r5fY56WQlDJqYsMoH6kGN7v1MlPUW2XS8ZSbwCqPhgdhS2+SJZZRpv59sYS9xc5P5I0I7BLAkLRoNo6ZtdMrvMLO1G+Wm06X9dnP7L9zCVt9zxdZOa93kl9FyGrIwlikfbor9V2KT8Ik3K10j9RONc+5G8dLY4uT9ldX4Bdb/AEPjlGj1TS5JLyMpamb6C92s7Oo5W6uM5e7SuN/VcvuhSztqHs6TSf67pZ/+V+5HIvQFZYn2P7lhDkvtHtFvO+o/CNUUl9iE8jF8i/p6KOrN4as8rHXY78h/9UcVyS+Z539NjepM9dXqs+fgFPWwrWbJxh5s8XPtS2S5zaXhF4Rg9bzHR8fv5ZyU+2ezs7b08eUeOb+Cwn82K29u2fkrhHz9Z/t9jyj1nxwC9X8cluNDEjZeJHobe1L7favml4L1V9hV6hZzlNs4z1ZXpRbjDK8DlnhdkdlXhwvONHUGkdQPUh80s7kbsmsOZx69R5/I3ettjH1XCpe88Z+46EkDVSdlQSjxSajFdXJpJfUwn2lpquVMXfNeGYx+vU4lms0zfFqNWpy83L+3IB9r6aCxVRbbLxbUV+pZmxFZ8a9nVs1es1CactqL/LX6v36lU6KT5qEsfBHIfa+snyphVSvhHif3/Yyst1Opi9++yxeEper9OgzrEvUS/B3pvR6dvf1VUX4cWX9EYz7Y0dfKim29/HEF+r+x52VtMOiU38OiB/Et6vEX3IlW2IrVV6Ovd/EGqfq0Kqlf0R4n9ZPAjZbqNY86m+yxPunJsvT6RvCUE0vAZduk0v8AMtUpe7V6zGL+i31V3tmVOlzjC+Q9HSwpjuaiUKoLvk+vl4/ISl2rdLlpa4Ur35etL9vsYTwvxddbJzfvPik/1D6l6OV458HS9O0EeUab5pfm9VZ+rIcz06K9jStx7m5LP9iEdX9A+x/V/wAOe9S+4p6l95CGCpRU5aB9IJvkIFsDzWDvlO8hAzuayb5fpOCEJRHPf6T0uS9lL5onplvdJLyRRAkC9Rk/Snq7XylbY18GwVdD+pkIGgOa35Ya1UF0g3/qDWskulSfnIohO7O5r/Q/TrscuCPkv3AlfxvNs5ya7m+hCB7hPJTCjqIR6VN+bSDWutx+FXCL8cZ/uWQJNkctgWam25YuvbXut8voDHUUwXLM34JYIQLqaI5a8lvXzxiGKviub+pj6RHLbUpy8WQh3WxdZb/Sem2d2EvDBCEC6mByUf/Z"
        title="Questions from Youtube - Javascript Basics"
        logo={BookImage}
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut."
        createdDate="06/14/2024"
        questionDetails={questionDetails}
        answerKeyDetails={answerKeyDetails}
      />
    </Grid>
  );
};

export default HistoryInterface;
