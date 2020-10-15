module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    event_type: {
      type: String,
      enum: ['CVPA', 'CVI', 'VOF'],
      default: 'CVPA',
    },
    version: {
      type: String,
      default: "",
    },
    created: {
      type: String,
      default: "",
    },
    created_mm_dd_yyyy: {
      type: Date,
      default: ""
    },
    organization: {
      type: String,
      default: '',
    },
    department: {
      type: String,
      default: 'None',
    },
    sctg: {
      type: String,
      default: 'None',
    },
    event_classification:{
      type: String,
      default: 'Top Secret',
      enum: ['Top Secret', 'Secret', 'Confidential', 'Classified','Unclassified']
    },
    declassified_date:{
      type: Date,
      default: '',
    },
    login: {
      type: String,
    },
    archive:{
      type: String,
      default: '',
    },
    systems: {
      type: String,
      default: '0',
    },
    initials: {
      type: String,
      default: '',
    },
    findings: {
      type: String,
      default: '0',
    },
    progress: {
      type: Number,
      default: 0,
    },
    avatar:{
      type: String,
      default: "https://avatars.dicebear.com/v2/gridy/Sigmund-Abbott.svg",
    },
  },
  {collection: 'event'}
  )

  schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
  })

  const Event = mongoose.model('event', schema)
  return Event
}