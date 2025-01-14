import streamlit as st
import numpy as np
import pandas as pd


conn = st.connection("postgresql", type="sql")

df = conn.query('SELECT * FROM test.bdt_background_train', ttl="10m")

st.line_chart(df)

