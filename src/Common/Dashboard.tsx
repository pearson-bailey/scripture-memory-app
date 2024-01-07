import React, { useCallback, useEffect, useState } from "react";
import "../styles/Dashboard.scss";
import { supabase } from "../supabaseClient";
import { Verse } from "../types";
import { Session } from "@supabase/supabase-js";
import VerseCard from "../UI/VerseCard";
import Select from "react-select";

interface DashboardProps {
  session: Session | null;
}

const Dashboard: React.FC<DashboardProps> = ({ session }) => {
  const [verses, setVerses] = useState<Verse[]>([]);
  const [tab, setTab] = useState<string>("verses");
  const options = [
    { value: "verses", label: "My Verses" },
    { value: "lists", label: "My Lists" },
    { value: "progress", label: "My Progress" },
  ];
  type Option = { value: string; label: string };

  useEffect(() => {
    async function getVerses() {
      if (session != null) {
        const { user } = session;

        const { data: verseData, error } = await supabase
          .from("verses")
          .select("reference, verse_text, version")
          .eq("user_id", user.id);

        if (error) {
          console.warn("Error retrieving verses: ", error.message);
        } else if (verseData && !verses.length) {
          setVerses(verseData);
        }
      } else {
        return;
      }
    }

    getVerses();
  }, [session]);

  const handleChange = useCallback(
    (option: Option | null) => {
      if (option && option.value != tab) {
        setTab(option?.value);
      }
    },
    [tab, setTab]
  );

  return (
    <div className="Dashboard container py-3">
      <div className="Dashboard__main d-flex flex-column align-items-center">
        <div className="Dashboard__header d-flex align-items-center">
          <h4 className="Dashboard__header__label mb-0 mx-2">Go to:</h4>
          <Select
            defaultValue={options[0]}
            isClearable={false}
            isSearchable={false}
            options={options}
            onChange={handleChange}
            classNamePrefix="Dashboard__header"
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary25: "#66d0c6",
                primary: "#35a29f",
              },
            })}
          />
        </div>
        {tab == "verses" ? (
          <div>
            {verses.map((verse, index) => (
              <VerseCard key={index} card={verse} />
            ))}
          </div>
        ) : tab == "lists" ? (
          <div>My Lists Placeholder</div>
        ) : (
          <div>My Progress Placeholder</div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
