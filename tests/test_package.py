import python_project_template


def test_package_exposes_a_version() -> None:
    assert python_project_template.__version__ == "0.1.0"
