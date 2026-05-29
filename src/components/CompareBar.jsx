import { useEffect, useState } from "react";
import { GitCompare, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { clearCompareList, getCompareList } from "../utils/storage";

function CompareBar() {
  const [items, setItems] = useState(getCompareList());
  const navigate = useNavigate();

  useEffect(() => {
    const update = () => setItems(getCompareList());
    window.addEventListener("compareChanged", update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener("compareChanged", update);
      window.removeEventListener("storage", update);
    };
  }, []);

  if (!items.length) return null;

  return (
    <div className="compare-bar">
      <div>
        <strong>{items.length}</strong> selected for comparison
      </div>
      <div className="compare-bar-actions">
        <Button onClick={() => navigate("/compare")} variant="primary">
          <GitCompare size={16} />
          Compare
        </Button>
        <Button onClick={clearCompareList} variant="ghost">
          <Trash2 size={16} />
          Clear
        </Button>
      </div>
    </div>
  );
}

export default CompareBar;
