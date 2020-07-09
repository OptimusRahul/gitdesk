import { applicationConfiguration } from '../config/config';

export const updateApplicationPath = (path) => {
    applicationConfiguration.customApplicationPath = path;
}