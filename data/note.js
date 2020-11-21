// ===============================================================================
// DATA
// Below data will act as a template for our note.
// Initially we just set it equal to a "dummy" note, but we will 
// legitimately use this note if the user is deleting the last element of the array,
// for example.
// ===============================================================================

var note = 
    {
      title : "my note",
      text: "my now",
      id: 0
    };
  
  
  // Note how we export the object. This makes it accessible to other files using require.
  module.exports = note;
  