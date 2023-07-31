const customStyles = {
  control: (base, state) => ({
    ...base,
    background: '#384151',
    // match with the menu
    borderRadius: '8px',
    color: '#d8d8d7',
    // Overwrittes the different states of border
    borderColor: state.isFocused ? '#384151' : '#384151',
    // Removes weird border around container
    boxShadow: state.isFocused ? null : null,
    '&:hover': {
      // Overwrittes the different states of border
      borderColor: state.isFocused ? '#384151' : '#384151',
    },
    '&:active': {
      scale: '1.05',
    },
  }),

  input: (base) => ({
    ...base,
    color: '#d8d8d7',
    padding:'4px'
  }),

  singleValue: (base) => ({
    ...base,
    color: '#d8d8d7',
  }),

  menu: (base) => ({
    ...base,
    background: '#384151',
    // override border radius to match the box
    borderRadius: '8px',
    // kill the gap
    marginTop: '4px',
    color: '#d8d8d7',
  }),
  menuList: (base) => ({
    ...base,
    padding: 0,
    color: '#d8d8d7',
    borderRadius: '8px',
  }),

  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    background: isFocused ? '#2f314a' : isSelected ? '#807aff' : undefined,
    zIndex: 1,
    color: '#d8d8d7',
    '&:active': {
      background: '#5f6396',
    },
    borderRadius: '8px',
  }),
  multiValue: (styles) => {
    return {
      ...styles,
      color: '#d8d8d7',
      backgroundColor: '#1f1d2c',
    };
  },
  multiValueLabel: (styles) => ({
    ...styles,
    color: '#d8d8d7',
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    color: '#d8d8d7',
    ':hover': {
      backgroundColor: '#c93264',
      color: 'white',
    },
  }),
  indicatorSeparator: (state) => ({
    ...state,
    display: 'none',
  }),
};

export { customStyles };
