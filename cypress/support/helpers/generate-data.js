import { faker } from "@faker-js/faker";

export const generateUserRegistrationData = () => {
  const password = faker.internet.password();
const unique = `${faker.person.firstName().toLowerCase()}${faker.string.alphanumeric(4)}`;

  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state({ abbreviated: true }),
    zipCode: faker.location.zipCode(),
    phone: faker.phone.number("###-###-####"),
    ssn: faker.string.numeric(9),
    username: unique,
    password,
    confirmPassword: password, 
  };
};
