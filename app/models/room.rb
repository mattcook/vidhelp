class Room
  def self.endpoint
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1zYXQ7dj0xIn0.eyJqdGkiOiJTS2ZjMTNkZTcxNjRhY2U5MmYwNmJhODcxNTE2YmIwYzFiLTE0MzcyNzkwNTciLCJpc3MiOiJTS2ZjMTNkZTcxNjRhY2U5MmYwNmJhODcxNTE2YmIwYzFiIiwic3ViIjoiQUNjZGE4Yjk1NTgwYzkwYWI4OTY2ZGNkNjA1NTk4MzYyNCIsIm5iZiI6MTQzNzI3OTA1NywiZXhwIjoxNDM3MzY1NDU3LCJncmFudHMiOlt7InJlcyI6Imh0dHBzOlwvXC9hcGkudHdpbGlvLmNvbVwvMjAxMC0wNC0wMVwvQWNjb3VudHNcL0FDY2RhOGI5NTU4MGM5MGFiODk2NmRjZDYwNTU5ODM2MjRcL1Rva2Vucy5qc29uIiwiYWN0IjpbIlBPU1QiXX0seyJyZXMiOiJzaXA6dGVzdGluZzEyM0BBQ2NkYThiOTU1ODBjOTBhYjg5NjZkY2Q2MDU1OTgzNjI0LmVuZHBvaW50LnR3aWxpby5jb20iLCJhY3QiOlsibGlzdGVuIiwiaW52aXRlIl19XX0.5MVbb08U-VmTSiNIXb-A-dLa0siSbxsyNnUFgCczpD4"
  end

  def self.get_all
    [
      { id: 1, name: "testing room1", description: "who this is a test", uuid: "124noi109dpwaa0921" },
      { id: 2, name: "testing room2", description: "who this is a test", uuid: "12321khoic" },
      { id: 3, name: "testing room3", description: "who this2 is a test", uuid: "12iu01naksx" },
      { id: 4, name: "testing room4", description: "who this is a test", uuid: "iuhurwe" }
    ]
  end
end
