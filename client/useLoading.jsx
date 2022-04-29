import {useEffect, useState} from "react";

export function useLoading(loadingFunction) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [data, setData] = useState();

    //Denna funktionen säger att vi nu är i färd med och laste, så ska vi sätta resultatet
    //av loadingFunctionen. Vi måste vänta till loadingFunktionen är färdig.
    //Om det kommer en fel så ska vi sätta och hantera den felen
    //Vi är sen färdiga med och laste och sätter loading till false.
    async function load() {
        try {
            setLoading(true);
            setData(await loadingFunction());
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    //Utför load funktionen blir kallad.
    useEffect(() => {
        load();
    }, []);

    return {loading, error, data};
}