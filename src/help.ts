interface Option {
  names: string[]
  description: string
}

interface Information {
  description: string
  options: Option[]
}

const information: Information = {
  description: 'cp command for copi :D',
  options: [
    {
      names: ['-h','--help'],
      description: 'Print information.'
    },
    {
      names: ['-V', '--version'],
      description: 'Print version.'
    }
  ]
}

export default information
