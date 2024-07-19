import React, { useEffect, useState } from "react";

import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Link } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const style = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 12,

    padding: 12,
    margin: 12,
  },

  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },

  ticketsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },

  ticketContainer: {
    display: "flex",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ababab",
    borderRadius: 6,
  },
});

const Page = () => {
  const [dates, setDates] = useState<Date[]>([]);

  useEffect(() => {
    (async () => {
      const rawDates = await AsyncStorage.getItem("@dates");
      if (!rawDates) return setDates([]);

      const strDatesArray = JSON.parse(rawDates);
      if (!Array.isArray(strDatesArray)) return setDates([]);

      const dates = strDatesArray
        .map((date) => new Date(date))
        .filter((date) => !isNaN(date.getTime()));

      setDates(dates);
    })();
  }, []);

  useEffect(() => {
    if (!dates.length) return;

    (async () => {
      await AsyncStorage.setItem("@dates", JSON.stringify(dates));
    })();
  }, [dates]);

  const addDate = () => {
    setDates([...dates, new Date()]);
  };

  return (
    <SafeAreaView style={style.container}>
      <View style={style.headerContainer}>
        <Button title="Créer un ticket !" onPress={addDate} />
        <Button
          title="Supprimer les tickets"
          color="red"
          onPress={() => setDates([])}
        />
      </View>

      <ScrollView contentContainerStyle={style.ticketsContainer}>
        {dates
          .sort((a, b) => b.getTime() - a.getTime())
          .map((date) => (
            <Link
              key={date.toISOString()}
              href={{
                pathname: "/ticket",
                params: { date: date.toISOString() },
              }}
              style={style.ticketContainer}
            >
              <Text>{date.toLocaleString()}</Text>
            </Link>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Page;
