export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);

  return { mode };
}
// transition Empty to Create
// back Create to Empty
// transition Empty to Create
// transition Create to Saving
// transition Create to Show
// transition Show to Edit
// back Edit to Show
// transition Show to Confirm
// transition Confirm to Deleting
// transition Confirm to Empty
