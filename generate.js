import { faker } from '@faker-js/faker';
import _ from 'lodash';
import * as fs from 'fs';
import * as path from 'path';

const getRandomItem = inputArray => {
    const randomIndex = Math.floor(Math.random() * inputArray.length);
    const item = inputArray[randomIndex];

    return item;
};

const issues = Array(1245)
    .fill(0)
    .map(() => ({
        id: faker.database.mongodbObjectId(),
        title: _.capitalize(faker.random.words(3)),
        description: _.capitalize(faker.random.words(7)),
        assignedTo: faker.name.fullName(),
        dueDate: faker.date.future().toISOString(),
        status: getRandomItem(['COMPLETED', 'IN_PROGRESS', 'TODO']),
    }));

fs.writeFileSync(
    path.join(process.cwd(), 'db.json'),
    JSON.stringify({ issues })
);
