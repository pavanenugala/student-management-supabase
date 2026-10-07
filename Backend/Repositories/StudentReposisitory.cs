using Dapper;
using Npgsql;
using StudentManagementAPI.Models;

namespace StudentManagementAPI.Repositories
{
    public class StudentRepository
    {
        private readonly string _connectionString;

        public StudentRepository(IConfiguration configuration)
        {
            _connectionString =
                configuration.GetConnectionString("DefaultConnection")!;
        }

        // GET ALL STUDENTS
        public async Task<IEnumerable<Student>> GetAllStudents()
        {
            using var connection =
                new NpgsqlConnection(_connectionString);

            string sql = @"
                SELECT
                    id AS Id,
                    firstname AS FirstName,
                    lastname AS LastName,
                    email AS Email,
                    age AS Age,
                    mobilenumber AS MobileNumber,
                    gender AS Gender,
                    course AS Course
                FROM ""Student""
                ORDER BY id DESC";

            return await connection.QueryAsync<Student>(sql);
        }

        // GET STUDENT BY ID
        public async Task<Student?> GetStudentById(int id)
        {
            using var connection =
                new NpgsqlConnection(_connectionString);

            string sql = @"
                SELECT
                    id AS Id,
                    firstname AS FirstName,
                    lastname AS LastName,
                    email AS Email,
                    age AS Age,
                    mobilenumber AS MobileNumber,
                    gender AS Gender,
                    course AS Course
                FROM ""Student""
                WHERE id = @Id";

            return await connection
                .QueryFirstOrDefaultAsync<Student>(
                    sql,
                    new { Id = id }
                );
        }

        // CREATE STUDENT
        public async Task AddStudent(Student student)
        {
            using var connection =
                new NpgsqlConnection(_connectionString);

            string sql = @"
                INSERT INTO ""Student""
                (
                    firstname,
                    lastname,
                    email,
                    age,
                    mobilenumber,
                    gender,
                    course
                )
                VALUES
                (
                    @FirstName,
                    @LastName,
                    @Email,
                    @Age,
                    @MobileNumber,
                    @Gender,
                    @Course
                )";

            await connection.ExecuteAsync(sql, student);
        }

        // UPDATE STUDENT
        public async Task UpdateStudent(Student student)
        {
            using var connection =
                new NpgsqlConnection(_connectionString);

            string sql = @"
                UPDATE ""Student""
                SET
                    firstname = @FirstName,
                    lastname = @LastName,
                    email = @Email,
                    age = @Age,
                    mobilenumber = @MobileNumber,
                    gender = @Gender,
                    course = @Course
                WHERE id = @Id";

            await connection.ExecuteAsync(sql, student);
        }

        // DELETE STUDENT
        public async Task DeleteStudent(int id)
        {
            using var connection =
                new NpgsqlConnection(_connectionString);

            string sql = @"
                DELETE FROM ""Student""
                WHERE id = @Id";

            await connection.ExecuteAsync(
                sql,
                new { Id = id }
            );
        }
    }
}