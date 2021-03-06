import {mount} from '@vue/test-utils';
import App from '../src/components/Navigation.vue';

describe('navigation_component', () => {
    let wrapper;

    const locations = [
        'Lombard St, San Francisco, CA, USA',
        'PIER 39, The Embarcadero, San Francisco, CA, USA',
        'Golden Gate Bridge, San Francisco, CA, USA',
        `Fisherman's Wharf, San Francisco, CA, USA`,
        'Alcatraz Island, San Francisco, CA, USA'
    ];

    const IDMAPS = {
        UP_BUTTON: 'up-button',
        DOWN_BUTTON: 'down-button',
        LOCATION: 'location',
        LOCATION_LIST_PARENT: 'location-list',
        LOCATIONS: ['location-0', 'location-1', 'location-2', 'location-3', 'location-4']
    };

    const getByTestId = (id, parent) => {
        if (!parent) {
            parent = wrapper;
        }
        return parent.find(`[data-testid="${id}"]`)
    }

    const existsWithin = (dataTestId, parentDataTestId) => {
        const parent = getByTestId(parentDataTestId);
        return parent.find(`[data-testid="${dataTestId}"]`).exists();
    };

    const click = async (button, parent) => {
        return getByTestId(button, getByTestId(parent)).trigger('click');
    }

    const getLocation = (locationId) => {
        return getByTestId(IDMAPS.LOCATION, getByTestId(locationId)).element.innerHTML.trim()
    }

    beforeEach(() => {
        wrapper = mount(App, {
            props: {
                locations: [...locations]
            }
        });
    })


    it('should render all the locations in the list', () => {
        const listContainer = getByTestId(IDMAPS.LOCATION_LIST_PARENT);
        const listNodes = listContainer.findAll('li');
        expect(listNodes.length).toEqual(5);
        locations.forEach((location, index) => {
            expect(getLocation(IDMAPS.LOCATIONS[index])).toEqual(location.trim());
        })
    });

    it('should have correct buttons for each location', () => {
        expect(existsWithin(IDMAPS.UP_BUTTON, IDMAPS.LOCATIONS[0])).toBeFalsy();
        expect(existsWithin(IDMAPS.DOWN_BUTTON, IDMAPS.LOCATIONS[0])).toBeTruthy();

        [1, 2, 3,].forEach(index => {
            expect(existsWithin(IDMAPS.UP_BUTTON, IDMAPS.LOCATIONS[index])).toBeTruthy();
            expect(existsWithin(IDMAPS.DOWN_BUTTON, IDMAPS.LOCATIONS[index])).toBeTruthy();
        })

        expect(existsWithin(IDMAPS.UP_BUTTON, IDMAPS.LOCATIONS[4])).toBeTruthy();
        expect(existsWithin(IDMAPS.DOWN_BUTTON, IDMAPS.LOCATIONS[4])).toBeFalsy();
    })

    it('should move the location down on clicking the down button', async () => {
        await click(IDMAPS.DOWN_BUTTON, IDMAPS.LOCATIONS[1]);
        expect(getLocation(IDMAPS.LOCATIONS[2])).toEqual(locations[1].trim());
        expect(getLocation(IDMAPS.LOCATIONS[1])).toEqual(locations[2].trim());

        await click(IDMAPS.DOWN_BUTTON, IDMAPS.LOCATIONS[2]);
        expect(getLocation(IDMAPS.LOCATIONS[3])).toEqual(locations[1].trim());
        expect(getLocation(IDMAPS.LOCATIONS[2])).toEqual(locations[3].trim());

        await click(IDMAPS.DOWN_BUTTON, IDMAPS.LOCATIONS[3]);
        expect(getLocation(IDMAPS.LOCATIONS[4])).toEqual(locations[1].trim());
        expect(getLocation(IDMAPS.LOCATIONS[3])).toEqual(locations[4].trim());
    })

    it('should move the location up on clicking the up button', async () => {
        expect(getLocation(IDMAPS.LOCATIONS[4])).toEqual(locations[4].trim());

        await click(IDMAPS.UP_BUTTON, IDMAPS.LOCATIONS[4]);
        expect(getLocation(IDMAPS.LOCATIONS[3])).toEqual(locations[4].trim());
        expect(getLocation(IDMAPS.LOCATIONS[4])).toEqual(locations[3].trim());

        await click(IDMAPS.UP_BUTTON, IDMAPS.LOCATIONS[3]);
        expect(getLocation(IDMAPS.LOCATIONS[2])).toEqual(locations[4].trim());
        expect(getLocation(IDMAPS.LOCATIONS[3])).toEqual(locations[2].trim());

        await click(IDMAPS.UP_BUTTON, IDMAPS.LOCATIONS[2]);
        expect(getLocation(IDMAPS.LOCATIONS[1])).toEqual(locations[4].trim());
        expect(getLocation(IDMAPS.LOCATIONS[2])).toEqual(locations[1].trim());

        await click(IDMAPS.UP_BUTTON, IDMAPS.LOCATIONS[1]);
        expect(getLocation(IDMAPS.LOCATIONS[0])).toEqual(locations[4].trim());
        expect(getLocation(IDMAPS.LOCATIONS[1])).toEqual(locations[0].trim());
    })

    it('Should be in correct state after a series of actions', async () => {
        await click(IDMAPS.DOWN_BUTTON, IDMAPS.LOCATIONS[0]);
        expect(getLocation(IDMAPS.LOCATIONS[1])).toEqual(locations[0].trim());
        expect(getLocation(IDMAPS.LOCATIONS[0])).toEqual(locations[1].trim());

        await click(IDMAPS.UP_BUTTON, IDMAPS.LOCATIONS[2]);
        expect(getLocation(IDMAPS.LOCATIONS[2])).toEqual(locations[0].trim());
        expect(getLocation(IDMAPS.LOCATIONS[1])).toEqual(locations[2].trim());

        await click(IDMAPS.UP_BUTTON, IDMAPS.LOCATIONS[4]);
        expect(getLocation(IDMAPS.LOCATIONS[3])).toEqual(locations[4].trim());
        expect(getLocation(IDMAPS.LOCATIONS[4])).toEqual(locations[3].trim());

        await click(IDMAPS.DOWN_BUTTON, IDMAPS.LOCATIONS[2]);
        expect(getLocation(IDMAPS.LOCATIONS[3])).toEqual(locations[0].trim());
        expect(getLocation(IDMAPS.LOCATIONS[2])).toEqual(locations[4].trim());

        await click(IDMAPS.DOWN_BUTTON, IDMAPS.LOCATIONS[1]);
        expect(getLocation(IDMAPS.LOCATIONS[2])).toEqual(locations[2].trim());
        expect(getLocation(IDMAPS.LOCATIONS[1])).toEqual(locations[4].trim());

    })
});
