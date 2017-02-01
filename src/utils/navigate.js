import { browserHistory } from 'react-router';

/**
 * Navigate to some path.
 * @param path
 */
export default function navigate(path) {
    browserHistory.push(path);
}
