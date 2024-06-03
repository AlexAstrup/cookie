import streamlit as st

genre = st.radio(
    "What's your favorite movie genre",
    [":rainbow[Comedy]", "***Drama***", "Documentary :movie_camera:"],
    captions=["Laugh out loud.", "Get the popcorn.", "Never stop learning."])

if genre == ":rainbow[Comedy]":
    st.write("You selected comedy.")
else:
    st.write("You didn't select comedy.")

#
# # Initialize connection.
# conn = st.connection("postgresql", type="sql")
#
# # Perform query.
# df = conn.query('SELECT * FROM mytable;', ttl="10m")
#
# # Print results.
# for row in df.itertuples():
#     st.write(f"{row.name} has a :{row.pet}:")
#
