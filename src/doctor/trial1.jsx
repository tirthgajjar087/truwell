{
    isAuthenticated ? (
        <Route path="/" element={<WrappedNavigation />}>
            <Route index element={<Dashboard />} />
            <Route path="/doctorprofile" element={<DoctorProfile />} />
            <Route path="/rota" element={<Rota />} />
            <Route path="/prescription" element={<Prescription />} />
        </Route>
    ) : (
        <Route path="/" element={<Login />} />
    )
}